<%@ Page Language="C#" EnableViewState="false" AutoEventWireup="true" CodeBehind="OrderConfirmationPrintPopUp.aspx.cs" Inherits="Gateway.WebStore.Checkout.OrderConfirmationPrintPopUp" %>
<%@ Register Src="../App_Controls/OrderInfo.ascx" TagName="OrderInfo" TagPrefix="uc1" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
	<title>Order Confirmation</title>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <asp:PlaceHolder runat="server">
		<%
			var theme = StateManager.SalesChannel.Merchant.WebTheme;
	    %>
		<link href="<%=ResolveUrl("~/FrontEnd/" + theme + "/fonts/typicons.min.css") %>" rel="stylesheet" type="text/css" />
        <link href="<%=ResolveUrl("~/FrontEnd/" + theme + "/" + theme + ".min.css")%>" rel="stylesheet" type="text/css" />
    </asp:PlaceHolder>
</head>
<body id="bodyOrderConfirmationPrint">
	<form id="Form1" runat="server">
		<div id="OrderConfirmationPrint">
			<cc1:HtmlContent ID="OrderConfirmationHtmlContent" Kind="OrderConfirmation" runat="server" />
			<div id="OrderConfirmationHeaderPrint">
				<table>
					<tr>
						<td>
							<asp:Button ID="PrintButton" runat="server" OnClientClick="window.print();" />
						</td>
						<td class="text-right">
							<div id="CloseButtonPrint"><asp:Button ID="CloseButton" runat="server" OnClientClick="javascript:window.close();" /> </div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div id="ContentHeadingPrint"><asp:Label ID="ContentHeadingLabel" runat="server" /></div><br />
						</td>
					</tr>
					<tr>
						<td colspan="2"><hr size="1" noshade /></td>
					</tr>
					<tr>
						<td colspan="2">
							<div id="OrderThankYouPrint"><asp:Literal ID="OrderThankYouLiteral" runat="server" /></div><br />
							<div id="OrderNumberPrint">
								<asp:Literal ID="OrderNumberLiteral" runat="server" />
								<asp:Literal ID="OrderExternalIDLiteral" runat="server" />
							</div>
							<p><asp:Literal ID="OrderInfoLiteral" runat="server" /></p>
						</td>
					</tr>
				</table>
			</div>
			<uc1:OrderInfo ID="OrderInfo" DisplayDescriptionAsLink="false" runat="server" ReadOnly="true" />
		</div>
	</form>
</body>
</html>
