<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateDropdownList.ascx.cs" Inherits="Gateway.Web.UI.Controls.DateDropdownList" %>

<div style="text-align: left">
     <asp:UpdatePanel ID="UpdatePanel1" runat="server"  UpdateMode="Conditional">
         <ContentTemplate>
        <table>
            <tr>
                <td>
                    <asp:Label ID="MonthLabel" runat="server" Text="Month"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="DateLabel" runat="server" Text="Date"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="YearLabel" runat="server" Text="Year"></asp:Label>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:DropDownList ID="MonthDropdownlist" runat="server" AutoPostBack="True" OnSelectedIndexChanged="MonthDropdownlist_SelectedIndexChanged">
                    </asp:DropDownList>
                </td>
                <td>
                    <asp:DropDownList ID="DateDropdownlist" runat="server">
                    </asp:DropDownList>
                </td>
                <td>
                    <asp:DropDownList ID="YearDropdownlist" runat="server" AutoPostBack="True" OnSelectedIndexChanged="YearDropdownlist_SelectedIndexChanged">
                    </asp:DropDownList>
                </td>
                <td> <asp:CustomValidator ID="Validator" runat="server" ControlToValidate="" ErrorMessage="* select date" Display="Dynamic" EnableClientScript="false" OnServerValidate="Validator_ServerValidate" Enabled="true" /></td>
            </tr>
          
        </table>

    </ContentTemplate>
    <Triggers >
        <asp:AsyncPostBackTrigger ControlID="MonthDropdownlist" EventName="SelectedIndexChanged" />
        <asp:AsyncPostBackTrigger ControlID="YearDropdownlist" EventName="SelectedIndexChanged" />
    </Triggers> 
     </asp:UpdatePanel>
    </div>