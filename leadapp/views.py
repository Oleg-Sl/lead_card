from rest_framework import views
from django.views.decorators.http import require_GET
from django.views.decorators.clickjacking import xframe_options_exempt
from django.shortcuts import render
from django.http import HttpResponse
import requests
import re
import json
import logging


class InstallApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        return render(request, 'lead/install.html')


class IndexApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        logging.basicConfig(filename='app.log', level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

        placement = request.data.get("PLACEMENT", [])
        placement_option = request.data.get("PLACEMENT_OPTIONS", [])
        entity_id = re.search(r'\d+', placement_option)[0]

        logging.info(f"Received post request with data: {request.data}")
        logging.info(f"Placement: {placement}")
        logging.info(f"Placement Options: {placement_option}")

        template = 'lead/index.html'
        if placement and placement[0] == 'DEFAULT':
            template = 'lead/msp.html'

        data = {
            "id": entity_id,
            "portal_url": "https://app.bits-company.ru/bitrix-crm-card/leadapp"
        }
        return render(request, template, context=data)

# {'PLACEMENT': ['DEFAULT'],             'PLACEMENT_OPTIONS': ['{"opened":"true","parameters":{"A":"177"}}']}
# {'PLACEMENT': ['CRM_LEAD_DETAIL_TAB'], 'PLACEMENT_OPTIONS': ['{"ID":"20671"}']}


    # @xframe_options_exempt
    # def get(self, request):
    #     data = {"id": 999}
    #     return render(request, 'lead/index.html', context=data)


# @require_GET
# def GetImage(request):
#     image_url = request.GET.get('url', '')
#     try:
#         response = requests.get(image_url, stream=True)
#         response.raise_for_status()
#
#         return HttpResponse(content=response.content, content_type=response.headers['content-type'])
#     except requests.RequestException as e:
#         return HttpResponse(content=f"Error fetching image: {str(e)}", status=500)


def GetImage(request):
    image_url = request.GET.get('url', '')
    try:
        # Используем сервер в качестве посредника (proxy)
        response = requests.get(image_url, stream=True)
        response.raise_for_status()

        # Передаем изображение в ответе
        return HttpResponse(content=response.content, content_type=response.headers['content-type'])
    except requests.RequestException as e:
        return HttpResponse(content=f"Error fetching image: {str(e)}", status=500)
