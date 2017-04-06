<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ChangePasswordConfirmation.aspx.cs" Inherits="Gateway.WebStore.account.ChangePasswordConfirmation" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <br />
    <div id="ChangePasswordConfirmation">
        <asp:Literal ID="ChangePasswordConfirmationLiteral" runat="server" />
        <asp:Button ID="ContinueButton" OnClick="ContinueButton_Click" runat="server" />
    </div>
</asp:Content>