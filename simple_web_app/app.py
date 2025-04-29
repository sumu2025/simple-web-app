from flask import Flask, render_template, jsonify

app = Flask(__name__, static_folder='../static')

@app.route('/')
def index():
    page_data = {
        "page_title": "我的简单网页应用",
        "heading": "欢迎!",
        "message": "这是使用 Flask 和模板生成的页面。"
    }
    return render_template('index.html', **page_data)

if __name__ == '__main__':
    app.run(debug=True)