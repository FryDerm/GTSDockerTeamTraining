<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="AssociatedTickets.aspx.cs" Inherits="Gateway.WebStore.Shop.AssociatedTickets" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register src="../App_Controls/EventsDateTimeSelector.ascx" tagname="EventsDateTimeSelector" tagprefix="uc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/EventsDateTimeSelectorModal.ascx" tagname="EventsDateTimeSelectorModal" tagprefix="uc2" %>
<%@ Register src="../App_Controls/DateSpecificSelectorModal.ascx" tagname="DateSpecificSelectorModal" tagprefix="uc3" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="AssociatedTickets" data-replace="AssociatedTickets">
		<div id="AssociatedTicketsDescription"><asp:Literal ID="AssociatedTicketsDescriptionLiteral" runat="server" /></div>
		<asp:ScriptManager ID="ScriptManager" runat="server" />
		<div id="AJAXContainer">
			<asp:UpdateProgress ID="UpdateProgress" runat="server" DisplayAfter="1500">
				<ProgressTemplate>
					<div id="UpdateProgress"><img src="../images/GTS/ajax-loading.gif" width="31" height="31" /><asp:Literal ID="UpdatingProgressLiteral" Text="Updating..." runat="server" /></div>
				</ProgressTemplate>
			</asp:UpdateProgress>
			<asp:UpdatePanel ID="UpdatePanel" runat="server" >
				<ContentTemplate>
					<asp:Repeater ID="AssociatedEventTicketsRepeater" runat="server" 
						OnItemDataBound="AssociatedEventTicketsRepeater_ItemDataBound">
						<HeaderTemplate>
							<table>
								<tr>
									<th><asp:Label ID="ItemDescHeadingLabel" runat="server" CssClass="ItemDescHeading" /></th>
									<th><asp:Label ID="ItemPriceHeadingLabel" runat="server" CssClass="ItemPriceHeading" /></th>
									<th><asp:Label ID="ItemQuantityHeadingLabel" runat="server" CssClass="ItemQuantityHeading" /></th>
									<th><asp:Label ID="SelectedEventDateTimeHeadingLabel" runat="server" CssClass="SelectedEventDateTimeHeading" /></th>
								    <th></th>
								</tr>
						</HeaderTemplate>
						<ItemTemplate>
							<tr data-object-key="tickets">
								<td data-html="pluName"><asp:Label ID="ItemDescLabel" runat="server" CssClass="ItemDesc" /></td>
								<td data-text="price"><asp:Label ID="ItemPriceLabel" runat="server" CssClass="ItemPrice" /></td>
								<td data-el="quantity"><asp:Label ID="ItemQuantityLabel" runat="server" CssClass="ItemQuantity" /></td>
								<td data-text="selectedEventDateTime"><asp:Label ID="SelectedEventDateTimeLabel" runat="server" CssClass="SelectedEventDateTime" /></td>	
                                <td data-el="selectDateTimeButton"><asp:Button ID="SelectDateTimeButton" runat="server" CssClass="SelectDateTime" Visible="false" OnClick="SelectDateTimeButton_Click" /></td>							
							</tr>
                            
                            <tr>
								<td colspan="5"><uc1:EventsDateTimeSelector ID="ItemEventsDateTimeSelector" runat="server" Visible="false" OnSelectionChanged="ItemEventsDateTimeSelector_SelectionChanged" /></td>
							</tr>							
						</ItemTemplate>
						<FooterTemplate>
							</table>
						</FooterTemplate>
					</asp:Repeater>
				    <uc2:EventsDateTimeSelectorModal ID="EventsDateTimeSelectorModal" runat="server" OnSelectionChanged="ItemEventsDateTimeSelector_SelectionChanged" />
                 
                   
				</ContentTemplate>
			</asp:UpdatePanel>
		</div>
		<table>
			<tr>
				<td>
					<span data-el="addToCartButton"><asp:Button ID="AddToCartButton" runat="server" OnClick="AddToCartButton_OnClick" /></span>
					<span data-el="cancelButton"><asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick" /></span>
				</td>
			</tr>
		</table>
	</div>
     <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/associatedTickets.html") %>
</asp:Content>