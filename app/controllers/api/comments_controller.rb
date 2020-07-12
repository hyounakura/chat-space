class Api::CommentsController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    @messages = group.comments.includes(:user).where("id > ?", last_message_id)
  end
end