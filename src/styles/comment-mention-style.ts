export const commentMentionsStyle = {
  control: {
    backgroundColor: 'hsl(var(--background))',
    minHeight: '80px',
    fontSize: 14,
    fontWeight: 'normal',
    borderRadius: 'calc(var(--radius) - 2px)',
    border: '1px solid hsl(var(--input))',
  },

  input: {
    color: 'hsl(var(--muted-foreground))',

    outline: 'none',
    border: '1px solid hsl(var(--input))',
  },

  '&multiLine': {
    control: {
      height: '2rem',
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid transparent',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    maxHeight: '100px',
    backgroundColor: 'hsl(var(--popover))',
    overflow: 'hidden',
    overflowY: 'auto',
    borderRadius: 'calc(var(--radius) - 2px)',
    list: {
      backgroundColor: 'transparent',
      fontSize: 13,
    },
    item: {
      padding: '5px 15px',
      borderBottom: 'hsl(var(--muted))',
      color: 'hsl(var(--muted-foreground))',
      '&focused': {
        borderRadius: 'calc(var(--radius) - 2px)',
        backgroundColor: 'hsl(var(--popover))',
      },
    },
  },
};
