
def get_validated_data(data, model, validation):
    try:
        data = model.model_validate(data)
        return {'success': 1, 'data': data}
    except validation as e:
        errors = [{'field': error['loc'][0], 'message': error['msg']} for error in e.errors()]
        return {'success': 0, 'message': 'Errors found.', "errors": errors, 'status': 400}
    except Exception as e:
        return {'success': 0, 'message': 'Something went wrong.', 'status': 500}
