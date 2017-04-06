<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="TransportationGuestNames.aspx.cs" Inherits="Gateway.WebStore.Transportation.TransportationGuestNames" %>
<%@ Register Src="../App_Controls/GuestNames.ascx" TagName="GuestNames" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <uc1:GuestNames ID="GuestNamesControl" runat="server" GuestNameMode="Transportation" />
</asp:Content>