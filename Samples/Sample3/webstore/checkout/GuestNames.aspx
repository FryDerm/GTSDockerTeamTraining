<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.GuestNames" Title="Untitled Page" Codebehind="GuestNames.aspx.cs" %>
<%@ Register Src="../App_Controls/GuestNames.ascx" TagName="GuestNames" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <uc1:GuestNames ID="GuestNamesControl" runat="server" GuestNameMode="PrintAtHome" />
</asp:Content>