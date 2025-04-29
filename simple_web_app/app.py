from flask import Flask, render_template, jsonify # 确保导入 jsonify

# 注意：这里的 static_folder 指向项目根目录下的 static 文件夹
# 如果您的 app.py 在 simple_web_app 子目录中，这个路径是正确的
app = Flask(__name__, static_folder='../static', template_folder='templates')

@app.route('/')
def index():
    # 返回 JSON 数据以匹配 test_index_route 测试
    return jsonify({"message": "欢迎使用 simple-web-app!"})

@app.route('/hello/<name>') # 新增路由以匹配 test_hello_route 测试
def hello(name):
    # 返回包含名字的 JSON 问候语
    return jsonify({"message": f"你好, {name}!"})

# 如果您还想保留原来的 HTML 页面功能，可以为它创建一个新的路由
@app.route('/welcome')
def welcome_page():
    page_data = {
        "page_title": "我的简单网页应用",
        "heading": "欢迎!",
        "message": "这是使用 Flask 和模板生成的页面。"
    }
    # 确保 templates 文件夹在 simple_web_app 目录下，或者调整 template_folder 参数
    return render_template('index.html', **page_data)

if __name__ == '__main__':
    # 运行 Flask 开发服务器
    # host='0.0.0.0' 允许从网络中的其他设备访问
    # port=5000 是 Flask 的默认端口
    app.run(debug=True, host='0.0.0.0', port=5000)