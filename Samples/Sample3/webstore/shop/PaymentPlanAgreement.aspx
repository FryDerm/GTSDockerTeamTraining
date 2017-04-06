<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.PaymentPlanAgreement" Codebehind="PaymentPlanAgreement.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <table cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
        <tr>
            <td>
	            <div data-html="userSelectMessageHtml">
					<asp:Literal ID="UserSelectMessageLiteral" runat="server" />
				</div>
        		<table width="100%" border="0" cellspacing="2" cellpadding="2">
					<tr>
						<td style="width:100%">
							<!-- Please note that the backend only adds one item to this list so not treating it as a list for DFE -->
							<div data-html="paymentPlanAgreementHtml">
								<asp:PlaceHolder ID="PaymentPlanAgreementPlaceHolder" runat="server">
           							<asp:DataList ID="PaymentPlanAgreementList" runat="server">
	        							<ItemTemplate>
											<tr>
			    								<td><%# Container.DataItem %></td>
											</tr>	        	
   										</ItemTemplate>
									</asp:DataList>
								</asp:PlaceHolder>
							</div>
						</td>
					</tr>
					<tr>
						<td>
						    <div data-el="continueButton"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" /></div>
						    <div data-el="cancelButton"><asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick" /></div>
						</td>
					</tr>
				</table>
            </td>
        </tr>
    </table>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/paymentPlansAgreement.html") %>
</asp:Content>