<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateSpecificSelector.ascx.cs" Inherits="Gateway.Web.UI.Controls.DateSpecificSelector" %>
<%@ Register Src="CalendarSelector.ascx" TagName="CalendarSelector" TagPrefix="uc1" %>

<div id="Calendar" style="width: 250px;">
	<table>
		<tr>
			<td>
				<asp:Literal ID="DateSpecificCalendarMessage" runat="server" />
				<uc1:CalendarSelector ID="DateSpecificCalendar" runat="server" 
					OnMonthChanged="MonthChanged"
					OnSelectionChanged="DateSelected"
					OnDayRender="CalendarSelector_DayRender" />
			</td>
		</tr>
		<tr>
			<td>
				<table cellpadding="2" cellspacing="0" align="center">
					<tr>
						<td><div id="LegendAvailable"></div></td>
						<td><asp:Literal ID="AvailableLiteral" runat="server" /></td>
						<td><div id="LegendNoAvailability"></div></td>
						<td><asp:Literal ID="NoAvailabilityLiteral" runat="server" /></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>