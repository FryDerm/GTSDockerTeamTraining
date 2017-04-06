<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CarriersSummary.ascx.cs" Inherits="Gateway.WebStore.Transportation.CarriersSummary" %>
<div class="Carriers">
    <asp:Repeater ID="CarriersListRepeater" runat="server" OnItemDataBound="CarriersListRepeater_ItemDataBound">
        <HeaderTemplate>
            <table cellpadding="0" cellspacing="0">
                <tr id="CarriersTitle">
                    <td colspan="2">
                        <asp:Literal ID="CarriersSummaryCarrierColumnLiteral" runat="server" />
                        <hr />
                    </td>
                </tr>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td class="Row">
                    <asp:Label ID="CarriersCode" runat="server"></asp:Label>
                </td>
                <td class="Row">
                    <asp:Label ID="CarriersName" runat="server"></asp:Label>
                </td>
            </tr>
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr>
                <td class="AltRow">
                    <asp:Label ID="CarriersCode" runat="server"></asp:Label>
                </td>
                <td class="AltRow">
                    <asp:Label ID="CarriersName" runat="server"></asp:Label>
                </td>
            </tr>
        </AlternatingItemTemplate>
        <FooterTemplate>
            </table>
        </FooterTemplate>
    </asp:Repeater>
</div>
