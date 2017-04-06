<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ItineraryDisplay.ascx.cs" Inherits="Gateway.WebStore.Transportation.ItineraryDisplay" %>

<div class="Itinerary">
        <div id="ItinerarySummaryHeader"><asp:Literal ID="ItinerarySummaryHeaderLiteral" runat="server" /></div>
        <hr />
        <div id="ItinerarySummary">       
	        <asp:Literal ID="ItinerarySummaryLiteral" runat="server" />
	    </div>		        
    </div>
<table id="ItineraryDisplayTable" cellpadding="0" cellspacing="0">
    <asp:Repeater ID="DepartingItineraryDisplayRepeater" runat="server" OnItemCreated="ItineraryRepeater_ItemCreated" OnItemDataBound="ItineraryRepeater_ItemDataBound">
        <HeaderTemplate>                   
                <tr id="ItineraryHeader">
                    <th class="OrigColumnCell"><asp:Literal ID="ItineraryOrigColumnLiteral" runat="server" /></th>
                    <th class="DestColumnCell"><asp:Literal ID="ItineraryDestColumnLiteral" runat="server" /></th>                
                    <th id="CarrierColumnHeader" runat="server" class="CarrierColumnCell"><asp:Label ID="ItineraryCarrierColumnLiteral" runat="server" /></th>            
                    <th id="SchedColumnHeader" runat="server" class="SchedColumnCell"><asp:Label ID="ItinerarySchedColumnLiteral" runat="server" /></th>
                    <th class="DepartsColumnCell"><asp:Literal ID="ItineraryDepartsColumnLiteral" runat="server" /></th>
                    <th class="ArrivesColumnCell"><asp:Literal ID="ItineraryArrivesColumnLiteral" runat="server" /></th>                
                    <th class="LayoverColumnCell"><asp:Literal ID="ItineraryLayoverColumnLiteral" runat="server" /></th>
                    <th class="TimeColumnCell"><asp:Literal ID="ItineraryTimeColumnLiteral" runat="server" /></th>
                </tr>   
        </HeaderTemplate> 
                   
        <ItemTemplate>
            <tr>
                <td class="OrigColumnCell"><asp:Label ID="ItineraryOrigin" runat="server" /></td>
                <td class="DestColumnCell"><asp:Label ID="ItineraryDestination" runat="server" /></td>            
                <td id="CarrierColumn" runat="server" class="CarrierColumnCell"><asp:Label ID="ItineraryCarrier" runat="server"  /></td>            
                <td id="SchedColumn" class="SchedColumnCell" runat="server"><asp:Label ID="ItinerarySched" runat="server"  /></td>
                <td class="DepartsColumnCell"><asp:Label ID="ItineraryDeparts" runat="server" /></td>
                <td class="ArrivesColumnCell"><asp:Label ID="ItineraryArrives" runat="server" /></td>
                <td class="LayoverColumnCell"><asp:Label ID="ItineraryLayover" runat="server" /></td>
                <td class="TimeColumnCell"><asp:Label ID="ItineraryTime" runat="server" /></td>
            </tr>
            
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr>
                <td class="OrigColumnCell"><asp:Label ID="ItineraryOrigin" runat="server" /></td>
                <td class="DestColumnCell"><asp:Label ID="ItineraryDestination" runat="server" /></td>            
                <td id="CarrierColumn" runat="server" class="CarrierColumnCell"><asp:Label ID="ItineraryCarrier" runat="server"  /></td>
                <td id="SchedColumn" class="SchedColumnCell" runat="server"><asp:Label ID="ItinerarySched" runat="server"  /></td>
                <td class="DepartsColumnCell"><asp:Label ID="ItineraryDeparts" runat="server" /></td>
                <td class="ArrivesColumnCell"><asp:Label ID="ItineraryArrives" runat="server" /></td>
                <td class="LayoverColumnCell"><asp:Label ID="ItineraryLayover" runat="server" /></td>
                <td class="TimeColumnCell"><asp:Label ID="ItineraryTime" runat="server" /></td>
            </tr>
        </AlternatingItemTemplate>
        <FooterTemplate>          
        </FooterTemplate>
    </asp:Repeater>

    <asp:Repeater ID="ReturningItineraryDisplayRepeater" runat="server" OnItemCreated="ItineraryRepeater_ItemCreated" OnItemDataBound="ItineraryRepeater_ItemDataBound">
                 
        <ItemTemplate>
        <tr><td colspan="7"><hr /></td></tr>
            <tr>
                <td class="OrigColumnCell"><asp:Label ID="ItineraryOrigin" runat="server" /></td>
                <td class="DestColumnCell"><asp:Label ID="ItineraryDestination" runat="server" /></td>            
                <td id="CarrierColumn" runat="server" class="CarrierColumnCell"><asp:Label ID="ItineraryCarrier" runat="server"  /></td>
                <td id="SchedColumn" class="SchedColumnCell" runat="server"><asp:Label ID="ItinerarySched" runat="server"  /></td>
                <td class="DepartsColumnCell"><asp:Label ID="ItineraryDeparts" runat="server" /></td>
                <td class="ArrivesColumnCell"><asp:Label ID="ItineraryArrives" runat="server" /></td>
                <td class="LayoverColumnCell"><asp:Label ID="ItineraryLayover" runat="server" /></td>
                <td class="TimeColumnCell"><asp:Label ID="ItineraryTime" runat="server" /></td>
             </tr>
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr>
                <td class="OrigColumnCell"><asp:Label ID="ItineraryOrigin" runat="server" /></td>
                <td class="DestColumnCell"><asp:Label ID="ItineraryDestination" runat="server" /></td>            
                <td id="CarrierColumn" runat="server" class="CarrierColumnCell"><asp:Label ID="ItineraryCarrier" runat="server"  /></td>
                <td id="SchedColumn" class="SchedColumnCell" runat="server"><asp:Label ID="ItinerarySched" runat="server"  /></td>
                <td class="DepartsColumnCell"><asp:Label ID="ItineraryDeparts" runat="server" /></td>
                <td class="ArrivesColumnCell"><asp:Label ID="ItineraryArrives" runat="server" /></td>
                <td class="LayoverColumnCell"><asp:Label ID="ItineraryLayover" runat="server" /></td>
                <td class="TimeColumnCell"><asp:Label ID="ItineraryTime" runat="server" /></td>
            </tr>
        </AlternatingItemTemplate>
        <FooterTemplate>         
        </FooterTemplate>
    </asp:Repeater>
</table>
