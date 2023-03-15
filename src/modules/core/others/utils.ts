export function formatDate(date: Date | null | undefined) {

   if (!date) {
      return '';
   }

   return new Date(date).toLocaleDateString('en-US')
}