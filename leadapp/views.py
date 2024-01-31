from rest_framework import views
from django.views.decorators.http import require_GET
from django.views.decorators.clickjacking import xframe_options_exempt
from django.shortcuts import render
from django.http import HttpResponse
import requests
import re
import json


class InstallApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        return render(request, 'lead/install.html')


class IndexApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        # print(request.data)
        # if request.data.get("PLACEMENT", []) and request.data['PLACEMENT'][0] == 'CRM_LEAD_DETAIL_TAB':
        #     r = request.data.get("PLACEMENT_OPTIONS", [])
        #     id_deal = re.search(r'\d+', r)[0]
        #     data = {"id": id_deal, }
        #     return render(request, 'lead/index.html', context=data)
        # else:
        data = {}
        return render(request, 'lead/msp.html', context=data)


    # @xframe_options_exempt
    # def get(self, request):
    #     data = {"id": 999}
    #     return render(request, 'lead/index.html', context=data)


@require_GET
def GetImage(request):
    image_url = request.GET.get('url', '')
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()

        return HttpResponse(content=response.content, content_type=response.headers['content-type'])
    except requests.RequestException as e:
        return HttpResponse(content=f"Error fetching image: {str(e)}", status=500)
