<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MemberInfoControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.MemberInfoControl" %>
<%@ Register src="../DateInput.ascx" tagname="DateInput" tagprefix="uc1" %>

        <asp:Repeater ID="AdditionalMemberInfoRepeater" runat="server"         
        OnItemDataBound="AdditionalMemberInfoRepeater_ItemDataBound" 
        OnItemCommand="AdditionalMemberInfoRepeater_RowCommand"
        EnableViewState="true">
        <HeaderTemplate>
            <table cellpadding="6" cellspacing="0">
               
                <tr id="MemberHeaderRow" runat="server">
                    <th id="MemberTypeHeaderCell" runat="server">
                        <asp:Label ID="MemberTypeLabel" runat="server" />
                    </th>
                    <th>
                        <asp:Label ID="MemberFirstNameLabel" runat="server" />
                    </th>
                    <th>
                        <asp:Label ID="MemberLastNameLabel" runat="server" />
                    </th>
                    <th>
                        <asp:Label ID="MemberDOBLabel" runat="server" />
                    </th>
                    <th>
                        <asp:Label ID="MemberRelationshipTypeLabel" runat="server" />
                    </th>
                    <th></th>
                </tr>                             
        </HeaderTemplate>
        <ItemTemplate>          
    
            <tr class="row">
                <td id="MemberTypeCell" runat="server">
                    <asp:DropDownList ID="MemberTypeDropDownList" runat="server">
                        <asp:ListItem Text="Adult" Value="0" Selected="True"></asp:ListItem>
                        <asp:ListItem Text="Child" Value="1"></asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                    <asp:HiddenField ID="IsAdultRequiredHiddenField" runat="server" />
                    <asp:HiddenField ID="ContactIDHiddenField" runat="server" />
                    <asp:TextBox ID="AdditionalMemberFirstNameTextBox" runat="server" CausesValidation="True" />
                   <asp:PlaceHolder ID="FirstNameRequiredFieldValidatorPlaceHolder" runat="server" />
                </td>
                <td>
                    <asp:TextBox ID="AdditionalMemberLastNameTextBox" runat="server" CausesValidation="True" />
                   <asp:PlaceHolder ID="LastNameRequiredFieldValidatorPlaceHolder" runat="server" />
                </td>
                <td id="AdditionalDOBTableColumn" runat="server">
                    <uc1:DateInput ID="AdditionalMemberDOBDateInput" runat="server" />
                </td>
                <td class="relationship_cell">
                    <asp:DropDownList ID="RelationshipTypeDropDownList" runat="server" AutoPostBack="false" >                                        
                    </asp:DropDownList>

                </td>
                <td >
                    <asp:ImageButton ID="DeleteImageButton" runat="server" ImageUrl="~/images/GTS/Close-icon.png" ToolTip="Delete" Width="24" />
                </td>
            </tr>
        </ItemTemplate>
        <FooterTemplate>
        </table>                          
        </FooterTemplate>
        </asp:Repeater>
   

