<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FeePopUp.aspx.cs" Inherits="Gateway.WebStore.shop.FeePopUp" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title></title>
	
	<link href="<%=ResolveUrl("~/FrontEnd/GTS/fonts/typicons.min.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%=ResolveUrl("~/FrontEnd/GTS/gts.min.css")%>" rel="stylesheet" type="text/css" />
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.min.js"></script>
	<script src="<%=ResolveUrl("~/scripts/jquery-1.12.4.min.js") %>"></script>
    <script src="<%=ResolveUrl("~/frontend/GTS/gts.js")%>"></script>
	
	<%-- 
		Dynamically add a link to the FeePopUp.css stylesheet. This will live
		in whatever the store's App_Themes folder is configured to
		for the current Merchant. This page doesn't inherit from GTSPage
		and therefor doesn't pull in the stylesheets automagically.
	--%>
    <script src="<%=ResolveUrl("~/scripts/ngFileUpload_8.0.1/ng-file-upload-all.min.js") %>"></script>
	<link href="<%=ResolveUrl("~/styles/"+StateManager.SalesChannel.Merchant.WebTheme+"/FeePopUp.css")%>" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="FeePopUpForm" runat="server">
        <div id="FeePopUp" data-replace="feePopup">
            <table cellpadding="2" cellspacing="0" >
		        <tr>
			        <td>
			            <div id="FeeInfoHeader" data-text="feePopupHeader">
			                <asp:Literal ID="FeeInfoHeaderLiteral" runat="server" />
			            </div>
			        </td>
				    <td class="text-right" data-el="closeButton"><asp:Button ID="CloseButton" runat="server" OnClientClick="javascript:window.close();" /></td>
			    </tr>
			    <tr>
			        <td colspan="2">
    			        <div id="FeeInfo" data-html="feeInfoHtml">
			                <asp:Literal ID="FeeInfoLiteral" runat="server" />
                        </div>			            
			        </td>
			    </tr>
            </table>
        </div>
		<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/feePopup.html") %>
    </form>
	
</body>
</html>
