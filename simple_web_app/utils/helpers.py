def format_response(data, status="success"):
    """
    格式化 API 响应
    
    Args:
        data: 要返回的数据
        status: 状态标识，默认为 "success"
        
    Returns:
        dict: 格式化的响应字典
    """
    return {
        "status": status,
        "data": data
    }