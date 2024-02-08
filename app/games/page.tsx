import { Button, Flex, Text } from '@radix-ui/themes';
import { games, insertGame } from '../game';

export default async function Games() {
  // await insertGame().then(() => {
  //   games();
  // });

  return (
    <>
      <div className="w-full max-w-xl px-5 xl:px-0">
        <Flex direction="column" gap="2">
          <Text>Hello from Radix Themes :)</Text>
          <Button>Let us go</Button>
        </Flex>
        <p className="text-sm font-semibold text-[#1d9bf0]">Games</p>
      </div>
    </>
  );
}
