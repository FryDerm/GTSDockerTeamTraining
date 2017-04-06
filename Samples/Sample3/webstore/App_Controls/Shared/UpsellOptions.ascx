<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UpsellOptions.ascx.cs" Inherits="Gateway.Web.UI.Controls.UpsellOptions" %>
<asp:Panel id="UpsellOptionsPanel" runat="server" CssClass="UpsellOptionsPanel">
    <asp:Literal ID="UpsellOptionsHeader" runat="server" />
	<asp:Repeater ID="UpsellOptionsRepeater" runat="server" OnItemDataBound="UpsellOptionsRepeater_ItemDataBound">
		<HeaderTemplate>
			<table>
		</HeaderTemplate>
		<ItemTemplate>
			<tr>
				<td valign="top" class="UpsellOptionsCheckBoxTableCell">
					<asp:CheckBox
					 ID="UpsellOptionCheckBox"
					 runat="server" 
					 OnCheckedChanged="UpsellOptionCheckBox_CheckedChanged" 
					 AutoPostBack="true" /><br />
					<asp:Label ID="DescriptionLabel" runat="server" />
				</td>
				<td valign="top" class="UpsellOptionsPriceTableCell"><asp:Label ID="PriceLabel" runat="server" /></td>
			</tr>
			<tr>
			    <td colspan="2">
			        <asp:PlaceHolder ID="UpsellPriceDataPlaceHolder" runat="server" />
			    </td>
			</tr>
		</ItemTemplate>
		<FooterTemplate>
			</table>
		</FooterTemplate>
	</asp:Repeater>
</asp:Panel>