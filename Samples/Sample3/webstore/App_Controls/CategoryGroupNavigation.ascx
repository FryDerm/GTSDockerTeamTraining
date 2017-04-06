<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CategoryGroupNavigation.ascx.cs" Inherits="Gateway.WebStore.CategoryGroupNavigation" %>
<div id="CategoryGroupNavigation">
	<asp:Repeater ID="ItemsRepeater" runat="server" OnItemDataBound="Items_ItemDataBound">
		<HeaderTemplate>
			<ul>
		</HeaderTemplate>
		<ItemTemplate>
			<li><asp:HyperLink ID="CategoryGroupHyperLink" runat="server" /></li>
		</ItemTemplate>
		<FooterTemplate>
			</ul>
		</FooterTemplate>
	</asp:Repeater>
</div>