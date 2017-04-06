<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" EnableViewState="false" Inherits="Gateway.WebStore.Checkout.OrderConfirmation" Title="Untitled Page" Codebehind="OrderConfirmation.aspx.cs" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Register Src="../App_Controls/OrderInfo.ascx" TagName="OrderInfo" TagPrefix="uc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="OrderConfirmation" data-replace="OrderConfirmation">
	    <span data-html="HeaderHtml">
		    <cc1:HtmlContent ID="OrderConfirmationHtmlContent" Kind="OrderConfirmation" runat="server" />
        </span>

		<div id="OrderConfirmationHeader">
			<div id="PrinterFriendly" data-html="PrinterFriendlyLink"><asp:HyperLink ID="PrintFriendlyHyperLink" runat="server" Visible="false"/></div>

			<asp:PlaceHolder ID="PrintOnWebPlaceHolder" runat="server" Visible="false">
				<div id="PrintTickets" data-html="PrintTicketsHtml">
					<p><asp:Literal ID="PrintTicketsLiteral" runat="server" /></p>
				</div>
                <span data-el="PrintTicketsButton"><asp:Button ID="PrintTicketsButton" runat="server" Text="Print Tickets" OnClientClick="ShowTickets();return false;" /></span>
			</asp:PlaceHolder>

			<asp:PlaceHolder ID="PrintOnWebFailedPlaceHolder" runat="server" Visible="false">
				<div id="PrintOnWebFailed">
					<p><asp:Literal ID="PrintOnWebFailedLiteral" runat="server" /></p>
				</div>
			</asp:PlaceHolder>

			<div id="OrderThankYou" data-text="OrderThankYou"><asp:Literal ID="OrderThankYouLiteral" runat="server" /></div><br />
			<div id="OrderNumber">
			    <span data-text="OrderNumberLabel">
				    <asp:Literal ID="OrderNumberLiteral" runat="server" />
                </span>
                <span data-text="OrderExternalID">
				    <asp:Literal ID="OrderExternalIDLiteral" runat="server" />
                </span>
			</div>
			<p data-text="OrderInfo"><asp:Literal ID="OrderInfoLiteral" runat="server" /></p>
		</div>
		
		<uc1:OrderInfo ID="OrderInfo" runat="server" ReadOnly="true" />
		
		<div id="Survey" data-html="SurveyHtml">
			<asp:PlaceHolder ID="SurveyPlaceHolder" runat="server">
				<asp:Literal ID="SurveyInfoLiteral" runat="server" />
				<asp:HyperLink ID="SurveyHyperLink" runat="server" />
			</asp:PlaceHolder>
		</div>
		
		<div id="MarketingMessages" data-html="MarketingHtml">
			<asp:PlaceHolder ID="MarketingMessagesPlaceHolder" runat="server">
				<asp:DataList ID="MarketingMessagesDataList" runat="server">
					<ItemTemplate>
						<tr>
							<td><%# Container.DataItem %></td>
						</tr>	        	
					</ItemTemplate>
				</asp:DataList>
			</asp:PlaceHolder>
		</div>
		
        <span data-text="OrderDetailsHeader"><asp:Literal ID="OrderDetailsHeader" runat="server"></asp:Literal></span>
        <span data-text="TotalsHeader"><asp:Literal ID="TotalsHeader" runat="server"></asp:Literal></span>
	</div>
    
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/orderConfirmation.html") %>
</asp:Content>