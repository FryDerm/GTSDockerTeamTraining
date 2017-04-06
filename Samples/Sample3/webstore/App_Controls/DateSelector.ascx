<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.DateSelector" Codebehind="DateSelector.ascx.cs" %>
<asp:DropDownList ID="MonthDropDownList" runat="server" />
<asp:DropDownList ID="DayDropDownList" runat="server" />
<asp:DropDownList ID="YearDropDownList" runat="server" />
<asp:CustomValidator ID="Validator" runat="server" ControlToValidate="" ErrorMessage="* invalid date" Display="Dynamic" EnableClientScript="false" OnServerValidate="Validator_ServerValidate" Enabled="false" />