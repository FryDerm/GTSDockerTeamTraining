<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="PromptForGuestNames.aspx.cs" Inherits="Gateway.WebStore.Checkout.PromptForGuestName" %>
<%@ Register Src="../App_Controls/GuestNames.ascx" TagName="GuestNames" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <uc1:GuestNames ID="GuestNamesControl" runat="server" GuestNameMode="PromptForName" />
</asp:Content>