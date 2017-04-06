<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.Navigation" Codebehind="Navigation.ascx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<div id="NavigationHtmlContent">
	<cc1:HtmlContent ID="HtmlContent" runat="server" Kind="Navigation" />
</div>
<div id="Navigation">
	<asp:Repeater ID="ItemsRepeater" runat="server" OnItemDataBound="Items_ItemDataBound">
		<HeaderTemplate>
			<ul>
		</HeaderTemplate>
		<ItemTemplate>
			<li data-object-key="items">
                <div data-html="link"><asp:HyperLink ID="CategoryHyperLink" runat="server" /></div>
			</li>
		</ItemTemplate>
		<FooterTemplate>
			</ul>
		</FooterTemplate>
	</asp:Repeater>
</div>
<div id="PassNavigation">
	<ul id="PassLinksUnorderedList" runat="server">
		<li><asp:HyperLink runat="server" ID="ChangePassInfoHyperlink" NavigateUrl="~/shop/PassLookup.aspx?RedirectUrl=Demographics" /></li>
		<li><asp:HyperLink runat="server" ID="RenewalPassHyperlink" NavigateUrl="~/shop/PassLookup.aspx?RedirectUrl=Renewal" /></li>
	</ul>
</div>