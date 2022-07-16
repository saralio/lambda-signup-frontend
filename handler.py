from saral_utils.utils.env import get_env_var, create_env_api_url
from saral_utils.utils.frontend import ShareLinks
from jinja2 import Environment, FileSystemLoader


def signup_html(event, context):

    env = get_env_var('MY_ENV')
    region = get_env_var('MY_REGION')
    register_base_url = create_env_api_url(url='register.saral.club/register')
    sl = ShareLinks()
    twitter_account_link = sl.twitter_account_link
    navbar_links = {'twitter_account_link': twitter_account_link}
    template_data = {'register_base_url': register_base_url, 'navbar_links': navbar_links}

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
