<%@ Page Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.CalendarPopup" Codebehind="CalendarPopup.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
   <form id="CalendarForm" runat="server">
		<div id="CalendarComposite">
			<div id="CalendarHeader">
				<table width="300" cellpadding="0" cellspacing="0" border="0">
				<tr>
				    <td colspan="3">
                       <asp:Literal ID="CalendarText" runat="server">
                        <p>Please select the date of your visit.</p>
                        Note: The arrows at the top left and right hand corners of the calendar will allow you to look at the prior and future months.
                       </asp:Literal>
				    </td>
				</tr>
				</table>
			</div>
			<div id="Calendar">
				 <asp:Calendar ID="EventsCalendar" runat="server" OnSelectionChanged="EventsCalendar_SelectionChanged" OnDayRender="EventsCalendar_DayRender" OnVisibleMonthChanged="EventsCalendar_VisibleMonthChanged" />
			</div>
		</div>
    </form>
</body>
</html>