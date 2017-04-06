<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PassContactSelector.ascx.cs" Inherits="Gateway.Web.UI.Controls.PassContactSelector" %>
<asp:Panel ID="PassContactPanel" runat="server" CssClass="PassContactSelector">
    <div id="PassContactInstruction" class="PassContactInstruction">
        <asp:Literal ID="InstructionLiteral" runat="server" />
    </div>

    <asp:Repeater ID="PassContactRepeater" runat="server" OnItemDataBound="PassContactRepeater_ItemDataBound">
        <HeaderTemplate>
            <table>
        </HeaderTemplate>
    
        <ItemTemplate>
            <tr id="PassHolderControlRow" runat="server" class="PassContactCell">
                <td id="PassHolderControlCell" runat="server" >
                
                </td>

                <td>
                    <asp:Label ID="PassHolderNameLabel" runat="server" CssClass="PassHolderName" />
                    <asp:Label ID="PassHolderWarningLabel" runat="server" CssClass="PassHolderWarning" />
                </td>
            </tr>
       
        </ItemTemplate>

        <FooterTemplate>
            </table>
        </FooterTemplate>
    </asp:Repeater>
        
</asp:Panel>