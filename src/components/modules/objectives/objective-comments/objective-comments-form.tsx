import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { useAddComment } from '@/hooks/comments';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, Send, SmilePlus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Mention, MentionsInput } from 'react-mentions';
import { z } from 'zod';

import { authApi } from '@/lib/auth-api';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useState } from 'react';
import { commentMentionsStyle } from '@/styles/comment-mention-style';

const testCommentSchema = z.object({
  description: z.string().min(1),
});

export function ObjectiveCommentsForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [showEmojis, setShowEmojis] = useState(false);

  const addMutation = useAddComment();

  const form = useForm<z.infer<typeof testCommentSchema>>({
    resolver: zodResolver(testCommentSchema),
  });

  function onSubmit(values: z.infer<typeof testCommentSchema>) {
    const variables = {
      content: values.description.trim(),
      objectiveId: Number(id),
    };

    addMutation.mutate(variables, {
      onSuccess: () => {
        form.reset({ description: '' });
      },
    });
  }

  const loading = addMutation.isLoading || form.formState.isSubmitting;

  function onClickEmoji(emojiData: EmojiClickData, event: MouseEvent) {
    const descriptionValue = form.getValues('description');
    form.setValue(
      'description',
      descriptionValue +
        (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );

    setShowEmojis(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <MentionsInput
                  aria-multiline="true"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={"Puedes mencionar a un compañero '@'"}
                  a11ySuggestionsListLabel={'Suggested mentions'}
                  style={commentMentionsStyle}
                  className="font-mono"
                >
                  <Mention
                    markup="@{{__type__||__id__||__display__}}"
                    trigger="@"
                    data={async (query, callback) => {
                      if (!query) return;
                      try {
                        const { data } = await authApi.get(
                          `/api/users?search=${query}`
                        );

                        if (data.data) {
                          const mapUsers = data.data.map((u) => ({
                            display: u.name,
                            id: u.id,
                          }));

                          callback(mapUsers);
                        }
                      } catch (error) {
                        throw new Error(error);
                      }
                    }}
                  />
                </MentionsInput>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <div className="relative">
            <Button
              type="button"
              className=""
              onClick={() => setShowEmojis((prev) => !prev)}
            >
              <SmilePlus />
            </Button>
            {showEmojis && (
              <div className="absolute right-16 -top-96">
                <EmojiPicker
                  onEmojiClick={onClickEmoji}
                  autoFocusSearch={false}
                  emojiStyle={EmojiStyle.NATIVE}
                  lazyLoadEmojis={true}
                />
              </div>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            Enviar comentario
            {loading ? (
              <Loader2Icon className="h-4 w-4 animate-spin ml-2" />
            ) : (
              <Send className="h-4 w-4 ml-2" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
