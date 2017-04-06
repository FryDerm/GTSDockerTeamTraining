<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="RSEvents.aspx.cs" Inherits="Gateway.WebStore.shop.RSEvents" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src='https://www.google.com/recaptcha/api.js'></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
       
       <h2>Reserved Seat Tickets</h2>
      <div class="g-recaptcha" data-sitekey="6LetswATAAAAAJAH6Fx5XWTKUfx0HJxC6A-ok_Dc"></div>
      <button type="submit">Continue</button>
   
</asp:Content>
