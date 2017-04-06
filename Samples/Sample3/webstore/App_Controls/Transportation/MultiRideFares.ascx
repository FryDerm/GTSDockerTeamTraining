<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultiRideFares.ascx.cs" Inherits="Gateway.WebStore.Transportation.MultiRideFares" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>

<asp:Repeater ID="FaresTemplateDetailsRepeater" runat="server"
    OnItemDataBound="FaresTemplateDetailsRepeater_ItemDataBound">
    <HeaderTemplate>
        <table class="MultiRideFaresTable" cellpadding="0" cellspacing="0">
            <tr>
                <th><asp:Literal ID="MultiRideCarrierColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRideRidesColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRideValidColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRideEffectiveColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRideExpireColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRidePriceColumnLiteral" runat="server" /></th>
                <th><asp:Literal ID="MultiRideQuantityColumnLiteral" runat="server" /></th>
            </tr>
    </HeaderTemplate>
    <ItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="ItemCarrierLabel" runat="server" />&nbsp;
                </td>
                <td>
                    <asp:Label ID="ItemRidesLabel" runat="server" />
                </td>
                <td>
                    <asp:Label ID="ItemValidLabel" runat="server" />
                </td>
                <td>
                    <asp:Label ID="ItemEffectiveDateLabel" runat="server" />
                </td>
                <td>
                    <asp:Label ID="ItemExpireDateLabel" runat="server" />
                </td>
                <td>
                    <asp:Label ID="ItemPriceLabel" runat="server" />
                </td>
                <td>
                    <cc1:NumericTextBox ID="ItemQuantityTextBox" runat="server" AllowDecimal="false" AllowNegative="false" />
                </td>
            </tr>
    </ItemTemplate>
   
    <FooterTemplate>
            <tr>
                <td class="AddToCartButtonCell" colspan="7">
                    <asp:Button ID="AddToCartButton" runat="server" OnClick="AddToCartButton_Click" />    
                </td>
            </tr>
        </table>
    </FooterTemplate>
</asp:Repeater>
