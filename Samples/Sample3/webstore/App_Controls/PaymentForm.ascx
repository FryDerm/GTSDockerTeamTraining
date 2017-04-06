<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PaymentForm.ascx.cs" Inherits="Gateway.WebStore.PaymentForm" %>

<table>
    <tr>
        <td>
            <asp:Label ID="FOPLabel" AssociatedControlID="FOPsDropDownList" runat="server" />
        </td>
        <td>
            <asp:DropDownList ID="FOPsDropDownList" runat="server" AutoPostBack="true" OnSelectedIndexChanged="FOPsDropDownList_SelectedIndexChanged" />
        </td>
    </tr>

    <tr>
        <td id="PaymentEndorsementColumn"><asp:Label ID="EndorsementLabel" runat="server" /></td>
        <td>
            <asp:TextBox ID="EndorsementTextBox" runat="server" />
            <asp:LinkButton ID="EditEndorsementButton" runat="server" OnClick="EditEndorsementButton_OnClick" Visible="false" />
        </td>
    </tr>
    
    <tr>
        <td>
            <asp:Label ID="CardExpirationDateLabel" AssociatedControlID="CardExpirationMonthDropDownList" runat="server" />
        </td>
        <td>
            <asp:DropDownList ID="CardExpirationMonthDropDownList" runat="server">
                <asp:ListItem Value="0" />
                <asp:ListItem Value="1" />
                <asp:ListItem Value="2" />
                <asp:ListItem Value="3" />
                <asp:ListItem Value="4" />
                <asp:ListItem Value="5" />
                <asp:ListItem Value="6" />
                <asp:ListItem Value="7" />
                <asp:ListItem Value="8" />
                <asp:ListItem Value="9" />
                <asp:ListItem Value="10" />
                <asp:ListItem Value="11" />
                <asp:ListItem Value="12" />
            </asp:DropDownList>
            <asp:DropDownList ID="CardExpirationYearDropDownList" runat="server">
                <asp:ListItem Value="0" />
            </asp:DropDownList>
        </td>
    </tr>

</table>