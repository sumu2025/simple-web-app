import pytest
from simple_web_app.app import app as flask_app  # 从您的应用模块导入 app

@pytest.fixture
def app():
    """创建并配置一个新的 app 实例用于每个测试"""
    # 如果您有复杂的应用工厂模式，可以在这里配置
    # 例如：app = create_app({"TESTING": True})
    flask_app.config.update({
        "TESTING": True,
    })
    yield flask_app

@pytest.fixture
def client(app):
    """一个测试客户端，用于向应用发送请求"""
    return app.test_client()

def test_index_route(client):
    """测试根路径 ('/')"""
    response = client.get('/')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data is not None  # 确保响应是 JSON
    assert "message" in json_data
    assert json_data["message"] == "欢迎使用 simple-web-app!"

def test_hello_route(client):
    """测试 /hello/<name> 路径"""
    response = client.get('/hello/Tester')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data is not None  # 确保响应是 JSON
    assert "message" in json_data
    assert json_data["message"] == "你好, Tester!"

def test_hello_route_another_name(client):
    """测试 /hello/<name> 路径使用不同的名字"""
    response = client.get('/hello/Buddy')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data is not None  # 确保响应是 JSON
    assert "message" in json_data
    assert json_data["message"] == "你好, Buddy!"
