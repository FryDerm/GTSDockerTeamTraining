<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="OrderProcessing.aspx.cs" Inherits="Gateway.WebStore.Checkout.OrderProcessing" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <div id="OrderProcessing">
        <asp:Label ID="OrderProcessingLabel" runat="server" />
    </div>
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <asp:Timer ID="PostBackTimer" runat="server" Interval="5000" OnTick="PostBackTimer_Tick" />
</asp:Content>