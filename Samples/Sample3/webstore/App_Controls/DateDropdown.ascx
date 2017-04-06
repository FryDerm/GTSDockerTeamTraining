<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateDropdown.ascx.cs" Inherits="Gateway.Web.UI.Controls.DateDropdown" %>


 <div style="text-align: left">
        <asp:Label ID="MonthLabel" runat="server" Text="Month"></asp:Label>
        &nbsp;&nbsp;
        <asp:DropDownList ID="MonthDropdownlist" runat="server">
        </asp:DropDownList>
        <br />
        <asp:Label ID="DateLabel" runat="server" Text="Date"></asp:Label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:DropDownList ID="DateDropdownlist" runat="server">
        </asp:DropDownList>
        <br />
        <asp:Label ID="YearLabel" runat="server" Text="Year"></asp:Label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <asp:DropDownList ID="YearDropdownlist" runat="server">
        </asp:DropDownList>
    </div>