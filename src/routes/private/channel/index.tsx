import "./styles.css";
import { Button } from "@/components";
import { Tabs } from "radix-ui";

export const Channel = () => {
  return (
    <div className="channel">
      <img
        className="channel__cover"
        src=""
        alt="Channel cover image"
      />
      <div className="channel__header flow-content">
        <div className="header-top">
          <img
            className="channel__avatar"
            src=""
            alt=""
          />
          <div className="header__info flow-content">
            <h1 className="channel__name">Beyond coding</h1>
            <div className="channel__info">
              <strong className="channel__handle">@BeyondCoding</strong>
              <span>•</span>
              <span>54.5K subscribers</span>
              <span>•</span>
              <span>892 videos</span>
            </div>
            <p className="channel__desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, id qui ea officia, rem sed quis impedit veritatis sunt
              iure consequuntur, accusamus nulla quod minus at nesciunt!
              Debitis, aspernatur ullam?
            </p>
            <div className="channel__links">
              <a href="">linkedin.com/in/yeldos-kozhabay/</a>
              <span className="more-links-btn">and 3 more links</span>
            </div>
            <Button
              title="Subscribe"
              className="channel__sub-btn"
            />
          </div>
        </div>
        <div className="header-bottom flow-content">
          <div className="channel__links">
            <a href="">linkedin.com/in/yeldos-kozhabay/</a>
            <span className="more-links-btn">and 3 more links</span>
          </div>
          <Button
            title="Subscribe"
            className="channel__sub-btn"
          />
        </div>
      </div>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="videos">Videos</Tabs.Trigger>
          <Tabs.Trigger value="playlists">Playlists</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="videos"></Tabs.Content>
        <Tabs.Content value="playlists"></Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
