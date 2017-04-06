<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EventsHeader.ascx.cs" Inherits="Gateway.Web.UI.Controls.EventsHeader" %>
<div id="EventsCalendarGroup">
	<asp:Repeater ID="EventsCalendarGroupRepeater" runat="server" OnItemDataBound="EventsCalendarGroupRepeater_DataBound">
		<HeaderTemplate>
		</HeaderTemplate>
		<ItemTemplate>
            <div class="event-calendar"  data-object-key="sharedCalendars">
                
                

                <span class="select-date" data-text="selectDateTimeText">
                    <asp:Literal ID="SelectDateLiteral" runat="server" />
                </span>
                <span class="event-type-name" data-text="eventTypeName">
                    <asp:Literal ID="EventTypeNameLiteral" runat="server" />
                </span>

                        <span data-el="selectDateTimeButton">
						    <asp:ImageButton ID="CalendarImageButton" runat="server" ImageUrl="~/images/GTS/CalendarIcon.gif" OnClick="CalendarImageButton_Click" />
					    </span>
                
                        <span data-el="clearDateTimeButton">
						    <asp:ImageButton ID="ClearCalendarImageButton" runat="server" CssClass="event-calendar-icon" ImageUrl="~/images/GTS/calendarSubtract.png" OnClick="ClearCalendarImageButton_Click" ToolTip="Clear Event" />
					    </span>
					   
				    

						<span data-text="selectedDateTime"><asp:Literal ID="SelectedDateLiteral" runat="server" /></span>
            </div>
		</ItemTemplate>
		<FooterTemplate>
			<div class="clear"></div>
		</FooterTemplate>
	</asp:Repeater>
</div>