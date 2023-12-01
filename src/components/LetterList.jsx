import styled from "styled-components";
import { useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import { useEffect, useState } from "react";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  const { isLoding, isError, letters } = useSelector((state) => state.letters);
  console.log("레터스다", letters);
  const [filteredLetter, setFilteredLetter] = useState();
  console.log("필터드 레터다", filteredLetter);
  console.log("맴버다", activeMember);

  // useEffect(() => {
  //   if (!isLoding) {

  //   }
  // }, []);

  if (isLoding) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }
  // const filteredLetters = letters[0]?.filter(
  //   (letter) => letter.writedTo === activeMember
  // );
  // setFilteredLetter(filteredLetters);
  // console.log("필터레터스다", filteredLetters);

  return (
    <ListWrapper>
      {filteredLetter?.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
          되보세요!
        </p>
      ) : (
        filteredLetter?.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  color: white;
`;
