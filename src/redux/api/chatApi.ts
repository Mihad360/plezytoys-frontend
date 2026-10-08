import { baseApi } from "./baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get My Conversations
    getMyConversations: builder.query<any, { searchTerm?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/conversations",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["conversation"],
    }),

    // 2. Create or Get 1-on-1 Conversation
    createOrGetConversation: builder.mutation<any, { recipientId: string }>({
      query: (data) => ({
        url: "/conversations",
        method: "POST",
        data,
      }),
      invalidatesTags: ["conversation"],
    }),

    // 3. Get Conversation by ID
    getConversationById: builder.query<any, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "conversation", id }],
    }),

    // 4. Delete Conversation
    deleteConversation: builder.mutation<any, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["conversation"],
    }),

    // 5. Get Messages in a conversation
    getMessages: builder.query<any, { conversationId: string; page?: number; limit?: number }>({
      query: ({ conversationId, ...params }) => ({
        url: `/messages/${conversationId}`,
        method: "GET",
        params: {
          sort: "createdAt",
          limit: 100,
          ...params,
        },
      }),
      providesTags: (result, error, { conversationId }) => [
        { type: "message", id: conversationId },
        "message",
      ],
    }),

    // 6. Send Text Message
    sendMessage: builder.mutation<
      any,
      { conversationId: string; content: string; messageType?: string }
    >({
      query: ({ conversationId, ...data }) => ({
        url: `/messages/${conversationId}/send-text`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { conversationId }) => [
        { type: "message", id: conversationId },
        "conversation",
      ],
    }),

    // 7. Send Attachment
    sendAttachment: builder.mutation<
      any,
      { conversationId: string; formData: FormData }
    >({
      query: ({ conversationId, formData }) => ({
        url: `/messages/${conversationId}/attachment`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: (result, error, { conversationId }) => [
        { type: "message", id: conversationId },
        "conversation",
      ],
    }),

    // 8. Delete Message
    deleteMessage: builder.mutation<any, { messageId: string; conversationId: string }>({
      query: ({ messageId }) => ({
        url: `/messages/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { conversationId }) => [
        { type: "message", id: conversationId },
        "conversation",
      ],
    }),
  }),
});

export const {
  useGetMyConversationsQuery,
  useCreateOrGetConversationMutation,
  useGetConversationByIdQuery,
  useDeleteConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useSendAttachmentMutation,
  useDeleteMessageMutation,
} = chatApi;
