<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FlyoutCart.ascx.cs" Inherits="Gateway.WebStore.FlyoutCart" %>

<a href="#"><asp:Literal ID="FlyoutCartTitleLiteral" runat="Server" /></a>

<div id="FlyoutCart">
    <asp:Label ID="FlyoutCartEmptyLabel" runat="server" />
    <asp:Repeater ID="FlyoutCartRepeater" runat="server" OnItemDataBound="FlyoutCartRepeater_ItemDataBound">

        <HeaderTemplate>
            <div id="FlyoutHeader"><asp:Literal ID="FlyoutCartHeaderLiteral" runat="server" /></div>
            <div id="FlyoutItemContainer">
        </HeaderTemplate>

        <ItemTemplate>
            <div class="FlyoutItem">
                <div class="FlyoutItemName"><asp:Literal ID="FlyoutCartItemNameLiteral" runat="server" /></div>
                <div class="FlyoutItemQuantity"><asp:Literal ID="FlyoutCartItemQtyLiteral" runat="server" /></div>
                <div class="FlyoutItemPrice"><asp:Literal ID="FlyoutCartItemPriceLiteral" runat="server" /></div>
                <div class="clear"></div>
            </div>
        </ItemTemplate>

        <FooterTemplate>
            </div>
            <div id="FlyoutFooter">
                <div id="FlyoutSubtotal">
                    <span><asp:Literal ID="FlyoutCartSubtotalLiteral" runat="server" /></span>
                    <span id="FlyoutSubtotalPrice"><asp:Literal ID="FlyoutCartSubtotalPriceLiteral" runat="server" /></span>
                    <div class="clear"></div>
                </div>

                <div id="FlyoutCartButtons">
                    <asp:HyperLink ID="ViewCartHyperLink" NavigateUrl="~/shop/ViewCart.aspx" runat="server" />
                </div>
            </div>
        </FooterTemplate>

    </asp:Repeater>
</div>