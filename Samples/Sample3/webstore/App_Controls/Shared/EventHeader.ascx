<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EventHeader.ascx.cs" Inherits="Gateway.Web.UI.Controls.EventHeader" %>
<div class="EventHeader"  data-is-event="true">
    
	<span data-text="eventDateTime"><asp:Literal ID="EventDateTimeLiteral" runat="server" /></span>
	<span data-text="eventTypeName"><asp:Literal ID="EventTypeNameLiteral" runat="server" /></span>
	<span data-el="selectDateTimeButton"><asp:ImageButton ID="CalendarImageButton" runat="server" ImageUrl="~/images/GTS/CalendarIcon.gif" OnClick="CalendarImageButton_Click" /></span>
    <span data-el="clearDateTimeButton"><asp:ImageButton ID="ClearCalendarImageButton" runat="server" ImageUrl="~/images/GTS/calendarSubtract.png" OnClick="ClearCalendarImageButton_Click" ToolTip="Clear Event" /></span>
</div>