
def get_validated_data(data, model, validation):
    try:
        data = model.model_validate(data)
        return {'success': 1, 'data': data}
    except validation as e:
        return {'success': 0, 'message': 'Invalid input provided.', 'status': 400}
    except Exception as e:
        return {'success': 0, 'message': 'Something went wrong.', 'status': 500}
    