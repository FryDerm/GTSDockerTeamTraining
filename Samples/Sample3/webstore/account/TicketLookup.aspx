<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.TicketLookup" Title="Untitled Page" Codebehind="TicketLookup.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="TicketLookup" data-replace="TicketLooup">
		<!-- ---------- [Ticket General Info] ---------- -->
		<table id="TicketInfo" runat="server" visible="false" enableviewstate="false">
			<tr>
				<td colspan="2" class="item-heading"><asp:Literal ID="GeneralInformationLiteral" runat="server" EnableViewState="false" /></td>
			</tr>
			<tr>
				<td width="155"><span data-text="VisualIdLabel"><asp:Literal ID="VisualIDLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="VisualId"><asp:Literal ID="VisualIDValueLiteral" runat="server" /></span></td>
			</tr>
			<tr>
				<td><span data-text="PluLabel"><asp:Literal ID="PLULiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="Plu"><asp:Literal ID="PLUValueLiteral" runat="server" /></span></td>
			</tr>
			<tr>
				<td><span data-text="ItemNameLabel"><asp:Literal ID="ItemNameLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="ItemName"><asp:Literal ID="ItemNameValueLiteral" runat="server" /></span></td>
			</tr>
			<tr>
				<td><span data-text="DescriptionLabel"><asp:Literal ID="DescriptionLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="Description"><asp:Literal ID="DescriptionValueLiteral" runat="server" /></span></td>
			</tr>
			<tr>
				<td><span data-text="PriceLabel"><asp:Literal ID="PriceLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="Price"><asp:Literal ID="PriceValueLiteral" runat="server" /></span></td>
			</tr>
            <tr>
				<td><span data-text="StatusLabel"><asp:Literal ID="StatusLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="Status"><asp:Literal ID="StatusValueLiteral" runat="server" /></span></td>
			</tr>
		    <tr id="ReplenishmentStatusRow" runat="server">
			    <td><span data-text="ReplenishmentStatusLabel"><asp:Literal ID="ReplenishmentStatusLiteral" runat="server" EnableViewState="false" /></span></td>
			    <td><span data-text="ReplenishmentStatus"><asp:Literal ID="ReplenishmentStatusValueLiteral" runat="server" /></span></td>
		    </tr>
		    <tr id="ExpiryDateRow" runat="server" visible="false">
                <td><span data-text="ExpirationDateLabel"><asp:Literal ID="ExpirationDateLiteral" runat="server" EnableViewState="false" /></span></td>
			    <td><span data-text="ExpirationDate"><asp:Literal ID="ExpirationDateValueLiteral" runat="server" /></span></td>
		    </tr>
			<tr>
				<td><span data-text="TotalRemainingUsesLabel"><asp:Literal ID="TotalRemainingUsesLiteral" runat="server" EnableViewState="false" /></span></td>
				<td><span data-text="TotalRemainingUses"><asp:Literal ID="TotalRemainingUsesValueLiteral" runat="server" /></span></td>
			</tr>
		</table>
		<br />
	    <!-- ---------- [active tickets] ---------- -->
	    <asp:Repeater ID="ActiveTicketsRepeater" runat="server" Visible="false" 
	        onitemdatabound="ActiveTicketsRepeater_ItemDataBound">
		    <HeaderTemplate>
			    <table width="100%">
				    <tr>
					    <th colspan="3" class="item-heading"><span data-table-shift="activeTickets">Active Tickets</span></th>
				    </tr>
				    <tr>
					    <th><b>Purchase</b></th>
					    <th><b>Uses Remaining</b></th>
					    <th><b>Expires</b></th>
				    </tr>
		    </HeaderTemplate>
		    <ItemTemplate>
				    <tr>
					    <td><span data-text="PurchaseDate"></span><asp:Label ID="PurchaseDateLabel" runat="server" /></span></td>
					    <td align="center"><asp:Label ID="UsesRemainingLabel" runat="server" /></td>
					    <td><asp:Label ID="ExpiresLabel" runat="server" /></td>
				    </tr>
		    </ItemTemplate>
		    <FooterTemplate>
			    </table>
				</span>
			    <br />
		    </FooterTemplate>
	    </asp:Repeater>
		<table align="center" id="ButtonsTable" runat="server">
		    <tr>
			    <td>
				    <!-- ---------- [start: button table] ---------- -->
				    <table cellpadding="1" cellspacing="0" border="0" ID="HistoryButtonTable" runat="server">
					    <tr>
						    <td>
							    <table cellpadding="0" cellspacing="1" border="0" width="100%">
								    <tr class="buttonMainHoverOff">
									    <td align="center" class="buttonMainHoverOff" >
										    <asp:Button ID="HistoryButton" runat="server" CssClass="btn" Text="History" onclick="HistoryButton_Click"></asp:Button>
									    </td>
								    </tr>
							    </table>
						    </td>
					    </tr>
				    </table>
				    <!-- ---------- [end: button table] ---------- -->
			    </td>
			    <td>&nbsp;&nbsp;</td>
			    <td>
				    <!-- ---------- [start: button table] ---------- -->
				    <table cellpadding="1" cellspacing="0" border="0" ID="PurchaseSummaryButtonTable" runat="server">
					    <tr>
						    <td>
							    <table cellpadding="0" cellspacing="1" border="0" width="100%">
								    <tr class="buttonMainHoverOff">
									    <td align="center" class="buttonMainHoverOff" >
										    <asp:Button ID="PurchaseSummaryButton" runat="server" CssClass="btn" Text="Purchase Summary" onclick="PurchaseSummaryButton_Click"></asp:Button>
									    </td>
								    </tr>
							    </table>
						    </td>
					    </tr>
				    </table>
				    <!-- ---------- [end: button table] ---------- -->
			    </td>
		    </tr>
		    <tr>
			    <td colspan="3"><br /></td>
		    </tr>
    	</table>
	    <!-- ---------- [history] ---------- -->
	    <asp:Repeater ID="HistoryRepeater" runat="server" Visible="false" onitemdatabound="HistoryRepeater_ItemDataBound">
		    <HeaderTemplate>
			    <table cellpadding="4" cellspacing="0" width="100%">
				    <tr>
					    <th colspan="3" class="item-heading"><span data-text="HistoryLabel">History</span></th>
				    </tr>
				    <tr>
					    <th><span data-text="historyDateTimeHeader"><b>Date &amp; Time</b></span></th>
					    <th><span data-text="historyActionsHeader"><b>Actions</b></span></th>
					    <th><span data-text="historyAccessPointHeader"><b>Access Point</b></span></th>
				    </tr>
		    </HeaderTemplate>
		    <ItemTemplate>
			    <tr id="ItemTableRow" runat="server">
				    <td><span data-table-shift="historyItems" data-text="dateTime"><asp:Label ID="DateTimeLabel" runat="server" /></span></td>
				    <td><span data-text="action"><asp:Label ID="ActionsLabel" runat="server" /></span></td>
				    <td><span data-text="accessPoint"><asp:Label ID="AccessPointLabel" runat="server" /><span></td>
			    </tr>
		    </ItemTemplate>
		    <FooterTemplate>
		            <tr id="FooterTableRow" runat="server" visible="false">
			            <td><span data-table-shift="historyItems" data-text="dateTime"><asp:Label ID="DateTimeLabel" runat="server" /></span></td>
			            <td><span data-text="action">Purchase</span></td>
			            <td><span data-text="accessPoint">&nbsp;</span></td>
		            </tr>
			    </table>
		    </FooterTemplate>
	    </asp:Repeater>
	    <table width="100%" ID="NextPreviousButtonTable" runat="server" visible="false">
		    <tr>
			    <td align="center" width="50%">
				    <!-- ---------- [start: button table] ---------- -->
				    <table cellpadding="1" cellspacing="0" border="0" ID="PreviousButtonTable" runat="server" visible="false">
					    <tr>
						    <td>
								<asp:Button ID="PreviousButton" runat="server" OnClientClick="javascript:history.go(-1);return false;" onmouseover="this.className='btno';" onmouseout="this.className='btn';" Text="&nbsp;Previous&nbsp;" />
						    </td>
					    </tr>
				    </table>
				    <!-- ---------- [end: button table] ---------- -->			
			    </td>
			    <td>
				    <!-- ---------- [start: button table] ---------- -->
				    <table cellpadding="1" cellspacing="0" border="0" id="NextButtonTable" runat="server" class="text-right" visible="false">
					    <tr>
						    <td class="text-right">
								<asp:Button ID="NextVIDButton" OnClick="NextVIDButton_Click" runat="server" Text="Next" />
						    </td>
					    </tr>
				    </table>
				    <!-- ---------- [end: button table] ---------- -->			
			    </td>
		    </tr>
	    </table>
	    <!-- ---------- [purchase history] ---------- -->
	    <asp:Repeater ID="PurchaseHistoryRepeater" runat="server" Visible="false" onitemdatabound="PurchaseHistoryRepeater_ItemDataBound">
	    <HeaderTemplate>
			    <table cellpadding="4" cellspacing="0" width="100%">
				    <tr>
					    <td colspan="2" class="item-heading">Purchase History</td>
				    </tr>
				    <tr>
					    <td><b>Date &amp; Time</b></td>
					    <td><b>Amount</b></td>
				    </tr>
		    </HeaderTemplate>
		    <ItemTemplate>
				    <tr>
					    <td><asp:Label ID="DateTimeLabel" runat="server"></asp:Label></td>
					    <td><asp:Label ID="AmountLabel" runat="server"></asp:Label></td>
				    </tr>
		    </ItemTemplate>
		    <FooterTemplate>
			    </table>
		    </FooterTemplate>	
	    </asp:Repeater>
	    <br />
	    <!-- ---------- [start: button table] ---------- -->
	    <table cellpadding="1" cellspacing="0" border="0" ID="Table1" runat="server" align="center" visible="false">
		    <tr>
			    <td align="center" style="cursor: pointer; cursor: hand;">
					<asp:Button ID="Button1" runat="server" OnClientClick="javascript:history.go(-1);return false;" Text="&nbsp;Back&nbsp;" />
			    </td>
		    </tr>
	    </table>
	    <!-- ---------- [end: button table] ---------- -->
	<!-- ---------- [start: button table] ---------- -->
	<table cellpadding="1" cellspacing="0" border="0" ID="BackButtonTable" runat="server" align="center" visible="false">
		<tr>
			<td align="center">
				<asp:Button ID="BackButton" runat="server" OnClientClick="javascript:history.go(-1);return false;" Text="&nbsp;Back&nbsp;" />
			</td>
		</tr>
	</table>
	<!-- ---------- [end: button table] ---------- -->
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/ticketLookup.html") %>
</asp:Content>