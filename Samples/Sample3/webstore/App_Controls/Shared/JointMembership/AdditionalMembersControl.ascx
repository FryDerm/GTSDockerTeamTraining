<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AdditionalMembersControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.AdditionalMembersControl" %>
<%@ Reference Control="~/masterpage.master" %>

<%@ Register src="MemberInfoControl.ascx" tagname="MemberInfoControl" tagprefix="uc1" %>

<asp:Panel ID="MyPanel" runat="server" DefaultButton="ContinueButton">
    <div id="PassInfo">
         <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div>
                    <asp:Label ID="ShowMessageLabel"  runat="server" CssClass="validationErrorMessage " Visible="false" EnableViewState="false" />
                </div>

                <asp:Panel ID="RequiredMemberListPanel" runat="server" CssClass="requiredmemberlist_block">
                    <div class="MemberInfoHeader"><asp:Label ID="RequiredAdultHeaderLabel" runat="server" ></asp:Label></div>                   
                     <uc1:MemberInfoControl ID="RequiredMemberInfoControl" runat="server" OnMemberInfoDeleted="MemberInfoControl_OnMemberInfoDeleted" />
                </asp:Panel>
                
                <asp:Panel ID="AdditionalMemberListPanel" runat="server" CssClass="additionalmemberlist_block">
                    <div class="MemberInfoHeader"><asp:Label ID="AdditionalMemberHeaderLabel" runat="server" ></asp:Label></div>                                     
                    <uc1:MemberInfoControl ID="AdditonalMemberInfoControl" OnMemberInfoDeleted="MemberInfoControl_OnMemberInfoDeleted" runat="server" />
                </asp:Panel>

                <div class="addbutton_block">
                    <asp:Button ID="AddMemberButton" runat="server" CausesValidation="false" OnClick="AddMemberButton_OnClick" />
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="AddMemberButton" />
            </Triggers>
        </asp:UpdatePanel>
        <table class="continue_block">
            <tr>
                <td>
                    <asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick"  Visible="false" />
                </td>
                <td>
                    <asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" Text="Continue" />
                </td>
            </tr>
        </table>
       
    </div>
</asp:Panel>


