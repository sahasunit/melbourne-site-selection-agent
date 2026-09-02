from unittest.mock import patch, MagicMock
from app.agent.agent import run_agent

def test_run_agent_calls_tool_then_returns_final_answer():
    #--- Build the fake tool_use block ---#
    fake_tool_use_block = MagicMock()
    fake_tool_use_block.type = "tool_use"
    fake_tool_use_block.name = "get_foot_traffic"
    fake_tool_use_block.input = {"area": "cbd"}
    fake_tool_use_block.id = "fake_tool_id_1"

    #--- Build the fake test block ---#
    fake_text_block = MagicMock()
    fake_text_block.type = "text"
    fake_text_block.text = "The CBD is busier than Kensington."

    #--- Wrap each fake block in a fake response ---#
    fake_response_1 = MagicMock()
    fake_response_1.content = [fake_tool_use_block]
    fake_response_1.stop_reason = "tool_use"

    fake_response_2 = MagicMock()
    fake_response_2.content = [fake_text_block]
    fake_response_2.stop_reason = "end_turn"

    #--- Build a fake tool result (what get_foot_traffic would normally return) ---#
    fake_tool_result = MagicMock()
    fake_tool_result.type = "tool_result"
    fake_tool_result.tool_use_id = "fake_tool_id_1"
    results = {
        "area": "cbd",
        "sensor_name": "Swa295_T",
        "sensing_date": "2026-08-20",
        "hour": 23,
        "pedestrian_count": 276,
        "schemaType": "foot_traffic"
    }
    fake_tool_result.content = str(results)

    #--- Patch client.messages.create AND get_foot_traffic ---#
    with patch("app.agent.agent.client") as mock_client, \
        patch("app.agent.agent.TOOL_REGISTRY", {"get_foot_traffic": lambda **kwargs: fake_tool_result}):

        mock_client.messages.create.side_effect = [fake_response_1, fake_response_2]

        result = run_agent("What's the foot traffic in the CBD?", "test-conv-integration")

    #--- Assertions ---#
    assert result["answer"] == "The CBD is busier than Kensington."
    assert mock_client.messages.create.call_count == 2
    assert len(result["results"]) == 1
    assert result["results"][0] == fake_tool_result
