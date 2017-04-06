<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PackageConstituentsControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.PackageConstituentsControl" %>
<div id="PackageDetails">
	<asp:ListView ID="PackageConstituentsListView" runat="server">
		<LayoutTemplate>
			<table>
				<tr>
					<th colspan="2">
						<asp:Literal ID="HeaderNameLiteral" runat="server" />
						<asp:Literal ID="PrintAtHomeGuestNameLiteral" runat="server" Visible="false" />
					</th>
				</tr>
				<asp:PlaceHolder ID="ItemPlaceHolder" runat="server" />
			</table>
		</LayoutTemplate>
		<ItemTemplate>
			<tr>
				<td valign="top">(<asp:Literal ID="QuantityLiteral" runat="server" />)</td>
				<td valign="top">
					<asp:Literal ID="ItemNameLiteral" runat="server" /><br />
					<asp:Button ID="SelectDateTimeButton" runat="server" Text="Select Date" Visible="false" />
					<asp:Label ID="PackageDetailSelectedEventDateLabel" runat="server" Visible="false" CssClass="PackageDetailSelectedEventDateLabel" />
				</td>
			</tr>
			<asp:PlaceHolder ID="EventsDateTimeSelectorPlaceHolder" runat="server" />
		</ItemTemplate>
	</asp:ListView>
</div>