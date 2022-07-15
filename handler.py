import json
from saral_utils.utils.env import get_env_var, create_env_api_url
from jinja2 import Environment, FileSystemLoader


def signup_html(event, context):

    env = get_env_var('MY_ENV')
    region = get_env_var('MY_REGION')
    register_base_url = create_env_api_url(url='register.saral.club/register')

    template_data = {'register_base_url': register_base_url}

    jinja_env = Environment(loader=FileSystemLoader('.'))
    with open('./templates/template.html', 'r') as file:
        html_template = file.read()
    
    template = jinja_env.from_string(html_template)
    content = template.render(template_data=template_data)

    response = {
        'statusCode': 200,
        'body': content,
        'headers': {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'Get'
        }
    }

    return response
