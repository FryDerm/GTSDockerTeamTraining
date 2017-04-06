<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PackageDetailsControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.PackageDetailsControl" %>
<%@ Register Src="../App_Controls/EventHeader.ascx" TagName="EventHeader" TagPrefix="uc1" %>
<div id="PackageDetails" data-is-package="true">
    <span data-el="package-plu-hidden">
	    <asp:HiddenField ID="PackagePLUHiddenField" runat="server" />
    </span>
	<asp:Repeater ID="PackageDetailsRepeater" runat="server" OnItemDataBound="PackageDetailsRepeater_ItemDataBound">
		<HeaderTemplate>
			<table class="PackageDetailsTable">
				<tr>
					<th colspan="3">
						<span data-html="package-name"><asp:Literal ID="HeaderNameLiteral" runat="server" /></span>
						<span data-html="package-description"><asp:Literal ID="HeaderDescriptionLiteral" runat="server" /></span>
						<span data-el="package-name-link"><asp:LinkButton ID="HeaderNameLinkButton" runat="server" Visible="false" OnClientClick="window.open('../shop/ItemDetailPopUp.aspx?SalesChannelDetailID={0}', 'ItemDetail', 'menubar=yes,scrollbars=yes,resizable=yes,width=480,height=560,top=0,left=0');return false;" /></span>
						<span data-text="print-at-home-guest-name"><asp:Literal ID="PrintAtHomeGuestNameLiteral" runat="server" /></span>
					</th>
				</tr>
		</HeaderTemplate>
		<ItemTemplate>
			<tr data-object-key="package-items">
				<td class="QuantityCell">(<span data-text="quantity"><asp:Literal ID="QuantityLiteral" runat="server" /></span>)</td>
				<td class="NameCell">
					<span data-text="item-name"><asp:Literal ID="ItemNameLiteral" runat="server" /></span>
                    <span data-text="package-event-date"><asp:Literal ID="PkgEventDateLiteral"  runat="server" Visible="false" /></span>
					<span data-el="pass-info-link"><asp:HyperLink ID="PassInfoHyperLink" runat="server" Visible="false" /></span>
					<div id="rosterLinks" runat="server" Visible="False"></div>
                    <span data-el="debit-info-link"><asp:HyperLink ID="DebitInfoHyperLink" runat="server" Visible="false" /></span>
					<span data-el="sales-channel-detail-id-hidden"><asp:HiddenField ID="SalesChannelDetailIDHiddenField" runat="server" /></span>
				    <span data-el="isDateSpecific"><asp:HiddenField runat="server" id="IsDateSpecific"/></span>
                </td>
				<td class="DateTimeDisplayCell">
					<uc1:EventHeader
						ID="EventHeader"
						runat="server"
						OnInitiateDateTimeSelection="EventHeader_InitiateDateTimeSelection"
                        OnClearPackageEventDateTime="EventHeader_ClearDateTimeSelection"
						Visible="false" />
				</td>
			</tr>
		</ItemTemplate>
		<FooterTemplate>
			</table>
		</FooterTemplate>
	</asp:Repeater>
</div>