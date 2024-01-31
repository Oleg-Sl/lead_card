from rest_framework import views
from django.views.decorators.clickjacking import xframe_options_exempt
from django.shortcuts import render
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
