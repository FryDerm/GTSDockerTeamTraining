<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.CartSmall" Codebehind="CartSmall.ascx.cs" %>
<div id="CartSmall" data-replace="CartSmall">
	<asp:Repeater ID="CartSmallRepeater" runat="server" OnItemDataBound="CartSmallRepeater_ItemDataBound">
		<HeaderTemplate>
			<table>
				<tr>
					<th colspan="3"><asp:Literal ID="CartSmallHeaderLiteral" runat="Server" /></th>
				</tr>
		</HeaderTemplate>
		<ItemTemplate>
			<tr data-object-key="cart-items">
				<td data-text="quantity"><asp:Literal ID="CartSmallItemQtyLiteral" runat="server" /></td>
				<td data-text="name"><asp:Literal ID="CartSmallItemNameLiteral" runat="server" /></td>
				<td nowrap align="right" data-text="price"><asp:Literal ID="CartSmallItemPriceLiteral" runat="server" /></td>
			</tr>
		</ItemTemplate>
		<FooterTemplate>
				<tr>
					<td colspan="2" align="right"><span data-text="footer-label"><asp:Literal ID="CartSmallFooterLiteral" runat="Server" /></span></td>
					<td align="right"><span data-text="subtotal"><asp:Literal ID="CartSmallFooterTotalLiteral" runat="server" /></span></td>
				</tr>
			</table>
		</FooterTemplate>
	</asp:Repeater>
</div>